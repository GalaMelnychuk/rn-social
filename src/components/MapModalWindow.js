import React from "react";
import { Modal, StyleSheet, Button, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Header } from "react-native-elements";

export const MapModalWindow = ({
  showModal,
  onCancelModal,
  latitude,
  longitude,
}) => {
  return (
    <Modal animationType="slide" visible={showModal} transparent={false}>
      <Header
        placement="center"
        centerComponent={{
          text: "Map",
          style: { ...styles.header },
        }}
        leftComponent={() => (
          <Button color="red" title="Back" onPress={onCancelModal} />
        )}
      />
      <View style={styles.modalContainerContent}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          zoomEnabled={true}
        >
          <Marker
            title="my location"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Image
              source={{
                uri:
                  "https://cdn4.iconfinder.com/data/icons/love-colored/512/heart_wings-512.png",
              }}
              style={styles.markerIcon}
            />
          </Marker>
        </MapView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: { color: "#fff", fontSize: 20 },
  modalContainerContent: {
    flex: 2,
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
  markerIcon: {
    width: 50,
    height: 50,
  },
});
