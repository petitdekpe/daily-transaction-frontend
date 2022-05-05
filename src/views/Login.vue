<template>
  <div class="form-container">
    <div class="form">
      <div class="form-header">
        <span>Connexion</span>
      </div>
      <div class="inputs">
        <div class="mail">
          <label for="">Adresse mail</label>
          <input type="email" v-model="email" />
        </div>
        <div class="pass">
          <label for="">Mot de passe</label>
          <input type="password" v-model="password" />
        </div>
      </div>
      <div class="form-footer">
        <button @click="login">Valid­er</button>
        <span
          >Vous n'avez pas de compte? <a href="Inscription">I­nscrivez-vous</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as  toastr from "toastr";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const url = "/api/login";
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          if (result.token) {
            this.$store.commit("getInfo", result);
            this.$router.push("/dashboard");
            toastr.success("Connexion réussie!")
            // alert(result.message)
            
          }
        })
        .catch((err) => {
          console.log("err");
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding-top: 5%;
  font-family: "Open sans";
}
.form {
  width: 691.69px;
  height: 646px;
  color: #ce8f31;
}
.form-header {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
}
.inputs {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
}
input {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 3px solid #ce8f31;
  border-radius: 10px;
  outline: none;
  flex-direction: column;
  font-size: 20px;
}
button {
  width: 179px;
  height: 72px;
  background-color: #ce8f31;
  color: white;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 48px;
}
.form-footer {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.form-footer span a {
  color: #ce8f31;
}
.form-footer span {
  color: #000000;
}
</style>