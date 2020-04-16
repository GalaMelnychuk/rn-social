import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        fontSize: 28,
        marginBottom: 20,
        marginHorizontal: 40,
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
        marginHorizontal: 130,
        padding: 10,
        marginTop: 30

    },
    buttonTitle: {
        fontSize: 24,
        textAlign: "center",
        color: "#32cd32",
        
    }
  });
  