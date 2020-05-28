import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center',
    },
    test: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      alignContent: "center",
      justifyContent: "flex-end",
      borderWidth: 4,
      borderColor: "red"
    },
    text: {
        color: "red",
        // fontSize: 24,
        marginBottom: 6,
        // marginHorizontal: 40,
    },
    input: {
        color: "#000080",
        fontWeight: "600",
        borderColor: "#4169e1",
        borderWidth: 2,
        fontSize: 24,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#f0f8ff",
        marginBottom: 40,
        marginHorizontal: 40
    },
    button: {
        borderColor: "#32cd32",
        fontSize: 24,
        borderWidth: 2,
        height: 56,
        borderRadius: 8,
        marginHorizontal: 94,
        padding: 10,
        marginTop: 30

    },
    buttonTitle: {
        fontSize: 24,
        textAlign: "center",
        color: "#32cd32",
        
    },
    modalView: {
      // ...Platform.select({
      //   ios: {
      //     marginTop: 220,
      //     marginBottom: 240,
      //   },
      //   android: {
      //     marginTop: 100,
      //     marginBottom: 200,
      //   },
      // }),
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 30,
      backgroundColor: "#d3d3d3",
      borderRadius: 20,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalInput: {
      ...Platform.select({
        ios: { marginBottom: 120 },
        android: { marginBottom: 50 },
      }),
      color: "#191970",
      fontFamily: "cabin700",
      padding: 10,
      width: "95%",
      height: "15%",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 9,
        height: 9,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: "#f0fff0",
    },
    modalBtns: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      opacity: 1,
    },
    modalBtnSave: {
      ...Platform.select({
        ios: {
          backgroundColor: "#faf0e6",
          padding: 5,
          width: "40%",
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          // elevation: 5,
        },
        android: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }),
    },
    modalBtnCnsl: {
      ...Platform.select({
        ios: {
          backgroundColor: "#f5f5f5",
          padding: 6,
          width: "40%",
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 5,
        },
        android: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }),
      fontWeight: "600",
    },
  });
  