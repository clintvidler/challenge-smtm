package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

const SRC = "http://smtm-xero:3000/api.xro/2.0/Reports/BalanceSheet"
const FRONTEND = "http://localhost:8080"

func balanceSheetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", FRONTEND)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodGet {
		w.Header().Set("Content-Type", "application/json")

		resp, err := http.Get(SRC)
		if err != nil {
			log.Fatalln(err)
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		sb := string(body)
		fmt.Fprint(w, sb)

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
	}
}

func main() {

	http.HandleFunc("/", balanceSheetHandler)

	fmt.Println("Server is running on port 9090...")
	if err := http.ListenAndServe(":9090", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
