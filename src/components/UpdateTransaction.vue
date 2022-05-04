<template>
  <div class="modal-container" v-if="showModal">
    <div class="modal">
      <div class="infomation">Mise a jour de transaction</div>
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
            <input type="radio" @click="types = 'entree'" :checked="types === 'entree'" class="radio1" name="types" /> <label for="">Entrée</label>
          </div>
          <div class="btn2">
            <input type="radio" @click="types = 'sortie'" :checked="types === 'sortie'"  class="radio2"  name="types"  /> <label for="">Sortie</label>
          </div>
        </div>
        <button class="btn-valdate" @click="updateTransaction">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal", "btnModal", "currentTransaction"],
  data() {
    return {
      libelle: this.currentTransaction.libelle,
      amount: this.currentTransaction.amount,
      dates: this.currentTransaction.dates,
      types: this.currentTransaction.type,
    };
  },
  methods: {
    updateTransaction() {
      if (!this.types) {
        alert("Veillez Choisir le type de la transaction");
        location.reload();
      }
      const url = `http://127.0.0.1:8000/api/transactions/${this.currentTransaction.id}`;
      let new_transaction = {
        libelle: this.libelle,
        amount: this.amount,
        dates: this.dates,
        type: this.types,
      };

      console.log(new_transaction);
      let requestOptions = {
        method: "PATCH",
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
          alert(result.message);
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
  padding-top: 50px;
  font-family: "Open sans";
}
.modal {
  width: 691.69px;
  height: 646px;
  background-color: white;
}
.infomation {
  height: 79.43px;
  background-color: #ce8f31;
  color: white;
  font-size: 36px;
  font-weight: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.libelle {
  width: 100%;
  padding: 0 46.39px;
  display: flex;
  flex-direction: column;
  margin-top: 163px;
}
.libelle label {
  margin-left: 4.46px;
  font-weight: 400;
  font-size: 24px;
}
.libelle input {
  height: 109.66px;
  border: 3px solid #ce8f31;
  border-radius: 10px;
  outline: none;
  font-size: 30px;
  padding: 10px;
}
.montant-date {
  width: 100%;
  padding: 0 46.39px;
  margin-top: 43.63px;
  display: flex;
  justify-content: space-between;
}
.montant-date div {
  display: flex;
  flex-direction: column;
}
.montant-date div input {
  width: 279.77px;
  height: 61.86px;
  border: 3px solid #ce8f31;
  border-radius: 10px;
  outline: none;
  font-size: 30px;
  padding: 10px;
}
.montant-date div label {
  margin-left: 4.46px;
  font-weight: 400;
  font-size: 24px;
}
.validation {
  width: 100%;
  padding: 0 46.39px;
  margin-top: 43.63px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  font-size: 24px;
  font-weight: 600;
}
.btn-radio input {
  border: 3px solid #ce8f31;
  background: red;
}
.validation button {
  width: 137.07px;
  height: 59.05px;
  background-color: #ce8f31;
  color: white;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 600;
  border-radius: 10px;
}
.btn1 {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn2 {
  display: flex;
  align-items: center;
  gap: 10px;
}
.radio1 {
  width: 1.25em;
  height: 1.25em;
  border: 3px solid #ce8f31;
  box-sizing: border-box;
}
.radio2 {
  width: 1.25em;
  height: 1.25em;
  border: 5px solid coral;
}
</style>