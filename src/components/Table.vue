<template>
  <UploadFile />
  <Table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, /*text,*/ record }">
      <!-- <template v-if="column.dataIndex === 'filename'">
        <div class="editable-cell">
          <div
            v-if="editableData[record.id]"
            class="editable-cell-input-wrapper"
          >
            <a-input
              v-model:value="editableData[record.id].filename"
              @pressEnter="save(record.id)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.id)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || " " }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.id)"
            />
          </div>
        </div>
      </template> -->
      <!-- <template v-else-if="column.dataIndex === 'operation'"> -->
      <template v-if="column.dataIndex === 'operation'">
        <!-- <Popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.id)"
        > -->
        <a @click="share(record.id)">分享 </a>
        <a @click="download(record.id)"> 下载</a>
        <!-- </Popconfirm> -->
      </template>
    </template>
  </Table>
</template>
<script charset="utf-8">
/* eslint-disable */

import UploadFile from "./Upload.vue";

import { computed, defineComponent, reactive, ref, onMounted } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { Table, Button } from "ant-design-vue";
import { cloneDeep } from "lodash-es";
import axios from "../axios/axios_setting";
const getFileList = (params) => {
  return axios.get("api/file/list", { params });
};
const shareFile = (params) => {
  return axios.post("api/share", params);
};
const downloadFile = (params) => {
  return axios.get("api/download/self", {
    params: params,
    responseType: "arraybuffer",
  });
};
const unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const getSizeStr = (size) => {
  let i = 0;
  while (size > 1024) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${unit[i]}`;
};
export default defineComponent({
  name: "FileTable",
  components: {
    CheckOutlined,
    EditOutlined,
    Table,
    UploadFile,
    Button,
  },

  setup() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        width: "30%",
      },
      {
        title: "文件名",
        dataIndex: "filename",
      },
      {
        title: "用户",
        dataIndex: "username",
      },
      {
        title: "文件大小",
        dataIndex: "size",
      },
      {
        title: "operation",
        dataIndex: "operation",
      },
    ];
    const dataSource = ref([]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData = reactive({});

    const edit = (id) => {
      editableData[id] = cloneDeep(
        dataSource.value.filter((item) => id === item.id)[0]
      );
    };

    const save = (id) => {
      Object.assign(
        dataSource.value.filter((item) => id === item.id)[0],
        editableData[id]
      );
      delete editableData[id];
    };

    const onDelete = (id) => {
      dataSource.value = dataSource.value.filter((item) => item.id !== id);
    };

    onMounted(() => {
      getFileList().then((res) => {
        for (let i = 0; i < res.data.data.files.length; i++) {
          res.data.data.files[i].size = getSizeStr(res.data.data.files[i].size);
          dataSource.value.push(res.data.data.files[i]);
        }
      });
    });

    return {
      columns,
      onDelete,
      dataSource,
      editableData,
      count,
      edit,
      save,
    };
  },
  methods: {
    share(id) {
      shareFile({
        file_id: id,
        need_pwd: true,
        duration: 60 * 60 * 24 * 7,
      }).then((res) => {
        alert(
          `分享成功,链接为${window.location.host}/api/download/share?share_id=${res.data.data.share_id}&password=${res.data.data.password}`
        );
      });
    },
    download(id) {
      downloadFile({
        file_id: id,
      }).then((res) => {
        downloadF(res);
      });
    },
  },
});
function downloadF(res) {
  let blob = new Blob([res.data]); //type是文件类，详情可以参阅blob文件类型
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob);
  const filename = res.headers["content-disposition"]
    .split(";")[1]
    .split("=")[1];

  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", decodeURI(filename));
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  // 挂载a标签
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL);
}
</script>
<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>