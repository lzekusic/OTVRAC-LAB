(async function() {
    try {
        const response = await fetch('http://localhost:3001/fetchMusicians');
        const tableData = await response.json();
        
        const grid = new gridjs.Grid({
            columns: [
                "Ime pjevača", "Prezime pjevača", "Datum rođenja pjevača", "Žanr pjevača",
                "Država rođenja", "Broj albuma", "Diskografska kuća", "Broj Grammy nagrada",
                "Broj prodanih albuma", "Naziv albuma", "Datum izdanja albuma", "Žanr albuma"
            ],
            data: tableData,
            search: false,
            pagination: false,
            sort: true
        }).render(document.getElementById("grid-table"));

        const searchInput = document.getElementById("search-input");
        const columnSelect = document.getElementById("column-select");

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const selectedColumn = columnSelect.value;

            const filteredData = tableData.filter(row => 
                selectedColumn === "all" 
                ? row.some(cell => cell.toString().toLowerCase().includes(query)) 
                : row[getColumnIndex(selectedColumn)].toString().toLowerCase().includes(query)
            );

            grid.updateConfig({ data: filteredData }).forceRender();
        });

        document.getElementById("export-csv").addEventListener("click", () => {
            exportData(getVisibleData(), 'csv');
        });

        document.getElementById("export-json").addEventListener("click", () => {
            exportData(getVisibleData(), 'json');
        });

        function getColumnIndex(columnName) {
            return {
                "ime_pjevaca": 0, "prezime_pjevaca": 1, "datum_rodenja": 2, "zanr": 3,
                "drzava_rodenja": 4, "broj_albuma_pjevaca": 5, "diskografska_kuca": 6,
                "broj_grammy_nagrada": 7, "broj_prodanih_albuma": 8, "naziv_albuma": 9,
                "datum_izdanja_albuma": 10, "zanr_albuma": 11
            }[columnName];
        }

        function getVisibleData() {
            return Array.from(document.querySelectorAll("#grid-table .gridjs-tbody .gridjs-tr")).map(row =>
                Array.from(row.querySelectorAll(".gridjs-td")).map(cell => cell.textContent.trim())
            );
        }

        function exportData(data, format) {
            const blob = format === 'csv'
                ? new Blob([data.map(row => row.join(",")).join("\n")], { type: "text/csv" })
                : new Blob([JSON.stringify(data.map(row => ({
                        "Ime pjevača": row[0], "Prezime pjevača": row[1], "Datum rođenja pjevača": row[2],
                        "Žanr pjevača": row[3], "Država rođenja": row[4], "Broj albuma": row[5],
                        "Diskografska kuća": row[6], "Broj Grammy nagrada": row[7],
                        "Broj prodanih albuma": row[8], "Naziv albuma": row[9],
                        "Datum izdanja albuma": row[10], "Žanr albuma": row[11]
                    })), null, 2)], { type: "application/json" });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = format === 'csv' ? "pjevaci.csv" : "pjevaci.json";
            a.click();
            URL.revokeObjectURL(url);
        }

    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
})();
