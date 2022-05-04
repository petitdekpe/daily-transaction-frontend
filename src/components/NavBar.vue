<template>
  <div class="main">
    <div class="navbar">
      <div class="auth">
        <span v-if="$store.state.authenticated == true" @click="logout"
          >Deconnexion</span
        >
        <a href="register"
          ><span v-if="$store.state.authenticated == false">S'inscrire</span></a
        >
        <a href="/"
          ><span v-if="$store.state.authenticated == false"
            >Se connecter</span
          ></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const url = "http://127.0.0.1:8000/api/logout";
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.message == "logout") {
            this.$store.commit("removeUserInfos");
            this.$router.push("/");
            alert("Deconnexion reussie");
          }
        });
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-family: Open sans;
  font-size: 24px;
  padding-top: 21px;
  padding-right: 77px;
}
.navbar span {
  display: block;
  width: 233px;
  color: #ce8f31;
  height: 65px;
  text-align: center;
  cursor: pointer;
}
.auth {
  display: flex;
  justify-content: center;
  gap: 2em;
}
.auth a {
  text-decoration: none;
}
</style>