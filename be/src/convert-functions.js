function formatDate(date) {
    if (!date) return "NULL";
    return new Date(date).toISOString().split('T')[0];
}

function transformMusicianDataToJson(rows) {
    const groupedData = {};

    rows.forEach((entry) => {
        const [
            ime_pjevaca,
            prezime_pjevaca,
            datum_rodenja,
            zanr,
            drzava_rodenja,
            broj_albuma_pjevaca,
            diskografska_kuca,
            broj_grammy_nagrada,
            broj_prodanih_albuma,
            naziv_albuma,
            datum_izdanja_albuma,
            zanr_albuma
        ] = entry;

        const artistKey = `${ime_pjevaca} ${prezime_pjevaca}`;

        if (!groupedData[artistKey]) {
            groupedData[artistKey] = {
                ime_pjevaca,
                prezime_pjevaca,
                datum_rodenja,
                zanr,
                drzava_rodenja,
                broj_albuma_pjevaca,
                diskografska_kuca,
                broj_grammy_nagrada,
                broj_prodanih_albuma,
                albumi: []
            };
        }

        groupedData[artistKey].albumi.push({
            naziv_albuma,
            datum_izdanja_albuma,
            zanr_albuma
        });
    });

    return Object.values(groupedData);
}

function convertToCSV(data) {
    const headers = [
        "ime_pjevaca",
        "prezime_pjevaca",
        "datum_rodenja",
        "zanr",
        "drzava_rodenja",
        "broj_albuma_pjevaca",
        "diskografska_kuca",
        "broj_grammy_nagrada",
        "broj_prodanih_albuma",
        "naziv_albuma",
        "datum_izdanja_albuma",
        "zanr_albuma"
    ];

    const csvRows = [headers.join(",")];

    data.forEach(entry => {
        const row = entry.map(value => {
            const escapedValue = `${value}`.replace(/"/g, '""');
            return `"${escapedValue}"`;
        });
        csvRows.push(row.join(","));
    });
    return csvRows.join("\n");
}

module.exports = { convertToCSV, transformMusicianDataToJson };