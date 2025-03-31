<template>
    <div>
      <img :src="getImageUrl(1)" alt="Game Image">
      <button @click="downloadImage">下载图片</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      getImageUrl(id) {
        return `/getImage/${id}`;
      },
      async downloadImage() {
        try {
          const response = await fetch(this.getImageUrl(1), {
            method: 'GET',
            headers: {
              'Content-Type': 'image/jpeg' // 根据实际图片类型调整
            }
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'game_image.jpg'; // 下载后的文件名，可根据需要修改
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('下载图片出错:', error);
          alert('下载图片失败，请稍后再试');
        }
      }
    }
  };
  </script>