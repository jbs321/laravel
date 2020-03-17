import { dispatchHelper } from './action-helpers'

export const IMPORT__IMPORT_FILE = "import__file";

export function importFile(data) {
    let fd = new FormData();
    fd.append("name", data.name);
    fd.append("file", data.file);

    return dispatchHelper(axios.post("/import", fd), IMPORT__IMPORT_FILE)
}
