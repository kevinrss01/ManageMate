import AxiosCallApi from "./axios";

const PREFIX = "files";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class FilesAPI {
  static async deleteFile(userId: string, fileId: string) {
    return AxiosCallApi.delete(formatSuffix(`deleteFile/${userId}/${fileId}`));
  }
}

export default FilesAPI;
