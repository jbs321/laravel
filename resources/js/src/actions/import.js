export const IMPORT__IMPORT_FILE = "import__file";

export function importFile(data) {
    let fd = new FormData();
    fd.append("name", data.name);
    fd.append("file", data.file);
    const request = axios.post("/import", fd);

    return {
        type: IMPORT__IMPORT_FILE,
        payload: request
    }
}
