<template>
    <div>
      <input type="file" ref="fileInput">
      <button @click="uploadImage">上传</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      uploadImage() {//该方法将游戏 ID 和图片文件封装成 FormData 对象
        const files = this.$refs.fileInput.files;
        if (!files || files.length === 0) {
          alert('请选择要上传的文件');
          return;
        }
        const file = files[0];
        const gameId = 1; // 假设游戏 ID 为 1
  
        const formData = new FormData();
        formData.append('gameId', gameId);
        formData.append('image', file);
  
        axios.post('/uploadf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response.data);
          alert('上传成功');
        }).catch(error => {
          console.error(error);
          alert('上传失败，请稍后再试');
        });
      }
    }
  };
  </script>