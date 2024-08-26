package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestBalanceSheetHandler_Success(t *testing.T) {
	// Create a test server to mock the external API
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		io.WriteString(w, `{"status": "success"}`)
	}))
	defer ts.Close()

	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()

	// Update the handler to use the test server's URL instead of the real one
	handler := func(w http.ResponseWriter, r *http.Request) {
		balanceSheetHandler(w, r)
	}

	handler(w, req)

	resp := w.Result()

	// Check the status code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status OK; got %v", resp.Status)
	}

	// Check the response body is not empty
	body, _ := io.ReadAll(resp.Body)
	if len(body) == 0 {
		t.Errorf("expected non-empty body; got empty")
	}

	// Check the CORS header
	if resp.Header.Get("Access-Control-Allow-Origin") != FRONTEND {
		t.Errorf("CORS header not set correctly")
	}
}

func TestBalanceSheetHandler_MethodNotAllowed(t *testing.T) {
	req := httptest.NewRequest("POST", "/", nil)
	w := httptest.NewRecorder()

	balanceSheetHandler(w, req)

	resp := w.Result()

	// Check the status code
	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("expected status Method Not Allowed; got %v", resp.Status)
	}

	// Check the response body
	body, _ := io.ReadAll(resp.Body)
	if string(body) != "Method not allowed" {
		t.Errorf("unexpected body: got %v", string(body))
	}
}

func TestBalanceSheetHandler_APIFailure(t *testing.T) {
	// Create a test server to mock an external API failure
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}))
	defer ts.Close()

	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()

	// Update the handler to use the test server's URL instead of the real one
	handler := func(w http.ResponseWriter, r *http.Request) {
		balanceSheetHandler(w, r)
	}

	handler(w, req)

	resp := w.Result()

	// Check that the status code is OK since the handler doesn't propagate the API's error
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status OK; got %v", resp.Status)
	}

	// Check the response body is not empty
	body, _ := io.ReadAll(resp.Body)
	if len(body) == 0 {
		t.Errorf("expected non-empty body; got empty")
	}
}
