import { uploadImage } from "api";

export const fileReaderHealper = (e, cb) => {
  const target = e.target;

  if (!FileReader) {
      alert('FileReader не поддерживается — облом');
      return;
  }

  if (!target.files.length) {
      alert('Ничего не загружено');
      return;
  }

  const fileReader = new FileReader();
  fileReader.onload = function() {
      cb(fileReader.result);
  }
  const formData = new FormData();
  formData.append("avatar", e)
  uploadImage(formData)
  fileReader.readAsDataURL(target.files[0]);
}