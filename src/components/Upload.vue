<template>
  <Upload
    v-model:file-list="fileList"
    name="file"
    action="api/upload"
    :headers="headers"
    @change="handleChange"
  >
    <Button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </Button>
  </Upload>
</template>
<script>
import { message } from "ant-design-vue";
import { Button, Upload } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "UploadFile",
  components: {
    UploadOutlined,
    Button,
    Upload,
  },

  setup() {
    const handleChange = (info) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    return {
      fileList,
      headers: {
        authorization: "authorization-text",
      },
      handleChange,
    };
  },
});
</script>