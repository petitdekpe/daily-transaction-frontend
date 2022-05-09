<template>
  <div class="modal-container" v-if="showModal">
    <div class="modal">
      <div class="infomation">Nouvelle transaction</div>
      <div class="libelle">
        <label for="">Libellé</label>
        <input type="text" v-model="libelle" />
      </div>
      <div class="montant-date">
        <div class="montant">
          <label for="">Montant</label>
          <input type="number" v-model="amount" />
        </div>
        <div class="date">
          <label for="">Date</label>
          <input type="date" v-model="dates" />
        </div>
      </div>
      <div class="validation">
        <div class="btn-radio">
          <div class="btn1">
            <input type="radio" @click="types = 'entree'" checked class="radio1" name="type"  /> <label for="">Entrée</label>
          </div>
          <div class="btn2">
            <input type="radio" @click="types = 'sortie'"  class="radio2"  name="type"  /> <label for="">Sortie</label>
          </div>
        </div>
        <button class="btn-valdate" @click="addTransaction">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as  toastr from "toastr";
export default {
  props: ["showModal", "btnModal"],
  data() {
    return {
      libelle: "",
      amount: "",
      dates: "",
      types: "entree",
    };
  },
  methods: {
    addTransaction() {
      if (!this.types) {
        alert("Veillez Choisir le type de la transaction");
        location.reload();
      }
      const url = "/api/transactions";
      let new_transaction = {
        libelle: this.libelle,
        amount: this.amount,
        dates: this.dates,
        type: this.types,

        // user_id: this.id

      };

      console.log(new_transaction);
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
        body: JSON.stringify(new_transaction),
      };

      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          this.btnModal();
          toastr.success("Transactions réussie")
          
          //alert(result.message);
          location.reload();
      
      })
        .catch((err) => {
          console.log("err");
        });
    },
  },
};
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  padding-top: 3.125em;
  font-family: "Open sans";
}
.modal {
  width: 20em;
  height: 30em !important;
  background-color: white;
}
.infomation {
  height: 4.938em;
  background-color: #ce8f31;
  color: white;
  font-size: 2.25em;
  font-weight: 25em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal .libelle {
  width: 100%;
  padding: 0 2.899em;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}
.modal .libelle label {
  margin-left: 0.300em;
  font-weight: 400;
  font-size: 1.5em ;
}
.modal .libelle input {
  height: 2.5em;
  border: 3px solid #ce8f31;
  border-radius: 0.625em;
  outline: none;
  font-size: 1.875;
  padding: 0.625em;
}
.montant-date {
  width: 100%;
  padding: 0 2.899em;
  margin-top: 2.688em;
  display: flex;
  justify-content: space-between;
}
.montant-date div {
  display: flex;
  flex-direction: column;
}
.montant-date div input {
  width: 17.486em;
  height: 3.866em;
  border:0.200em solid #ce8f31;
  border-radius: 0.625em;
  outline: none;
  font-size: 1.875em;
  padding: 0.625em;
}
.montant-date div label {
  margin-left: 0.279em;
  font-weight: 400;
  font-size: 1.5em;
}
.validation {
  width: 100%;
  padding: 0 2.899em;
  margin-top: 2.688em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.25em;
  font-size: 1.5em;
  font-weight: 600;
}
.btn-radio input {
  border: 0.625em solid #ce8f31;
  background: red;
}
.validation button {
  width: 8.567em;
  height: 3.691em;
  background-color: #ce8f31;
  color: white;
  border: none;
  outline: none;
  font-size: 1.5em;
  font-weight: 600;
  border-radius: 0.625em;
}
.btn1 {
  display: flex;
  align-items: center;
  gap: 0.625em;
}
.btn2 {
  display: flex;
  align-items: center;
  gap: 0.625em;
}
.radio1 {
  width: 1.25em;
  height: 1.25em;
  border: 0.625em solid #ce8f31;
  box-sizing: border-box;
}
.radio2 {
  width: 1.25em;
  height: 1.25em;
  border: 0.313em solid coral;
}



@media screen and (max-width:800px) {
  .modal {
  width: 22em !important;
  height: 30em !important;
  
}
.infomation {
  height: 1.5em;
  font-size: 1.5em;
  font-weight: 10em;
}

.libelle input {
  height: 2em !important;
  width: 9.5em;
  border-radius: 0.2em;
  
}

.modal .montant-date {
  margin-top: 0.1em;
  display: block;
  
}
.modal .validation {
  padding: 0 2.899em;
  margin-top: 0.3em;
  flex-direction: column;
}
.modal .validation button {
  width: 5em;
  height: 2em;
  margin-top: 0.1em;

}


}

  
</style>