<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-5" max-width="400">
      <v-card-title class="justify-center">
        <h3>Login</h3>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Username Input -->
          <v-text-field
            v-model="username"
            label="Username"
            :rules="usernameRules"
            required
            outlined
          ></v-text-field>

          <!-- Password Input -->
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
            outlined
          ></v-text-field>

          <!-- Submit Button -->
          <v-btn
            color="primary"
            class="mr-4"
            @click="submit"
            :disabled="!valid"
            block
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn variant="text" @click="forgotPassword">Forgot Password?</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      valid: false,
      username: "",
      password: "",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    submit() {
      const form = this.$refs.form;
      if (form.validate()) {
        // Implement your form submission logic (e.g., API call)
        axios
          .post("https://sondage-server.vercel.app/login", {
            username: this.username,
            password: this.password,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire("Error!", error.response.data.message, "error");
          });
      }
    },
    forgotPassword() {
      // Implement your password recovery logic
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: 10px;
}
</style>
