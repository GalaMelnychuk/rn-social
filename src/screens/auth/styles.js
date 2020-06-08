import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  text: {
    color: "red",
    marginBottom: 8,
    paddingLeft: 10,
  },
  input: {
    color: "#000080",
    fontWeight: "600",
    borderColor: "#4169e1",
    borderWidth: 2,
    fontSize: 24,
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
    marginHorizontal: 40,
    ...Platform.select({
      ios: {
        marginBottom: 20,
      },
    }),
  },
  btnAuth: {
    borderColor: "#32cd32",
    fontSize: 24,
    borderWidth: 2,
    height: 56,
    borderRadius: 8,
    marginHorizontal: 94,
    padding: 10,
    marginTop: 30,
  },
  btnTitle: {
    fontSize: 24,
    textAlign: "center",
    color: "#32cd32",
  },
  btnsLogInScreen: {
    marginBottom: 90,
  },

  btnsRegisterScreen: Platform.select({
    ios: {
      marginBottom: 90,
    },
  }),
});
