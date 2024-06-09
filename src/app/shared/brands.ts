export const Brands = {
  // bolt: {
  //   name: 'Bolt',
  //   url: '',
  //   parseFn: (brandname: string, json: any) => {
  //     return json.data.data.categories[0].vehicles.map((item: any) => {
  //       return {
  //         brand: brandname,
  //         color: 'green',
  //         name: item.name,
  //         latitude: item?.lat,
  //         longitude: item?.lng,
  //         batteryPercentage: item.charge,
  //         distanceOnCharge: Number(item.distance_on_charge / 1000).toFixed(3),
  //       };
  //     });
  //   },
  // },
  ewings: {
    name: 'E-wings',
    url: '/assets/mock-api/ewings.json',
    parseFn: (brandname: string, json: any) => {
      // console.log('>>', json.data);
      return json.data.map((item: any) => {
        try {
          return {
            brand: brandname,
            color: 'black',
            name: item?.publicId,
            latitude: item?.location?.latitude,
            longitude: item?.location?.longitude,
            batteryPercentage: Math.round(item?.batteryPercentage * 100),
            distanceOnCharge:
              Number(
                Math.round(item?.batteryPercentage * 15000) / 1000
              ).toFixed(3) || item?.estimatedRemainingDistance,
          };
        } catch (error) {
          console.log('ERROR parsing JSON', item);
          console.error('>>', error);
          return {};
        }
      });
    },
  },
};
