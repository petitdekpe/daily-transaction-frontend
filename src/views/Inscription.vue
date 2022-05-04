<template>
  <div class="form-container">
    <div class="form">
      <div class="form-header">
        <span>Inscription</span>
      </div>
      <div class="inputs">
        <div class="nom">
          <label for="">Nom</label>
          <input type="text" v-model="name" />
        </div>
        <div class="mail">
          <label for="">Adresse mail</label>
          <input type="email" v-model="email" />
        </div>
        <div class="pass">
          <label for="">Mot de pass</label>
          <input type="password" v-model="password" />
        </div>
      </div>
      <span class="info">Mot de passe oubilié</span>
      <div class="form-footer">
        <button @click="register">Valider</button>
        <span
          >Vous avez déjà un compte? <a href="Connexion">Connexion</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      const url = "/api/register";
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.user) {
            alert(result.message);
            this.$router.push("/");
            alert(result.message);
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
}
.form-header {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
  color: #ce8f31;
}
.inputs {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
}
.nom {
  color: #ce8f31;
  margin-top: 20px;
}
input {
  display: flex;
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  border: 3px solid #ce8f31;
  border-radius: 10px;
  outline: none;
  flex-direction: column;
}
.mail {
  color: #ce8f31;
}
.pass {
  color: #ce8f31;
}
.form span.info {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  text-decoration-line: underline;
  color: #000000;
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
}
.form-footer {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;
}
.form-footer span a {
  color: #ce8f31;
}
</style>