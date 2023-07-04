import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import MainNavigation from "./src/navigation/MainNavigation";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/store";
export default function App() {
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  //   const userData = JSON.parse(data);
  //   console.log(userData.user_id);
  //   api
  //     .post("api/getPunchCard", {
  //       user_id: userData.user_id,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <>
      <StoreProvider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <MainNavigation />
        </ApplicationProvider>
      </StoreProvider>
    </>
  );
}
