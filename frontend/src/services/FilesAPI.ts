import AxiosCallApi from "./axios";

const PREFIX = "files";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class FilesAPI {
  static async deleteFile(userId: string, fileId: string, accessToken: string) {
    return AxiosCallApi.delete(formatSuffix(`deleteFile/${userId}/${fileId}`), {
      headers: { Authorization: accessToken },
    });
  }
}

export default FilesAPI;
