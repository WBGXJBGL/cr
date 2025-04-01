<template>
  <div>
    <button @click="fetchGames">游戏库</button>
    <button @click="showAddGameForm = true">添加游戏</button>
    <!-- 添加上传和下载组件 -->
    <upload></upload>
    <download></download>
    <div v-if="showAddGameForm">
      <h3>添加游戏</h3>
      <input v-model="newGame.name" placeholder="游戏名称">
      <input v-model="newGame.description" placeholder="游戏描述">
      <button @click="addGame">提交</button>
      <button @click="showAddGameForm = false">取消</button>
    </div>
    <ul v-if="games.length > 0">
      <li v-for="game in games" :key="game.id">
        <h3>{{ game.name }}</h3>
        <p>{{ game.description }}</p>
      </li>
    </ul>
    <p v-else>暂无游戏数据。</p>
  </div>
</template>

<script>
import axios from 'axios';
// 引入上传和下载组件
import Upload from '../views/upload.vue';
import Download from '../views/download.vue';

export default {
  components: {
    Upload,
    Download
  },
  data() {
    return {
      games: [],
      showAddGameForm: false,
      newGame: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('/games');
        this.games = response.data;
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    async addGame() {
      try {
        const response = await axios.post('/games', this.newGame);
        this.games.push(response.data);
        this.showAddGameForm = false;
        this.newGame = {
          name: '',
          description: ''
        };
      } catch (error) {
        console.error('Error adding game:', error);
      }
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>