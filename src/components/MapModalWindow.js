import React from "react";
import {
  Modal,
  StyleSheet,
  Button,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapModalWindow = ({ showModal, onCancelModal, latitude, longitude }) => {
  return (
    <Modal animationType="slide" visible={showModal} transparent={true}>
      <View
        style={{
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
        }}
      >
        <MapView
            // showsUserLocation={true}
            style={{ ...StyleSheet.absoluteFillObject }}
          style={{ width: "100%", height: 200 }}
          zoomEnabled={true}
          minZoomLevel={5}
        >
          <Marker
            title="travel location"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            
          >
            {/* <Image
              style={{
                width: 30,
                height: 30,
                marginBottom: 10,
                borderRadius: 10,
              }}
              source={require("../../assets/like.png")}
            /> */}
          </Marker>
        </MapView>
        <View style={{ width: 200, height: 200, justifyContent: "center" }}>
          <Button title="Back" onPress={onCancelModal} />
        </View>
      </View>
    </Modal>
  );
};

export default MapModalWindow;
