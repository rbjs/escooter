export const Brands = {
  'https://proxyapi-phi.vercel.app/api/bolt.js': {
    name: 'Bolt',
    parse: (brandname: string, json: any) => {
      return json.data.data.categories[0].vehicles.map((item: any) => {
        return {
          brand: brandname,
          color: 'green',
          name: item.name,
          latitude: item?.lat,
          longitude: item?.lng,
          batteryPercentage: item.charge,
          distanceOnCharge: +(item.distance_on_charge / 1000).toFixed(3),
        };
      });
    },
  },
  'https://proxyapi-phi.vercel.app/api/ewings.js': {
    name: 'E-wings',
    parse: (brandname: string, json: any) => {
      return json.data.data
        // .filter(item => item?.location)
        .map((item: any) => {
        try {
          return {
            brand: brandname,
            color: 'black',
            name: item?.publicId,
            latitude: item?.location?.latitude,
            longitude: item?.location?.longitude,
            batteryPercentage: Math.round(item?.batteryPercentage * 100),
            distanceOnCharge:
              +(Math.round(item?.batteryPercentage * 15000) / 1000).toFixed(3) ||
              item?.estimatedRemainingDistance,
          };
        } catch (error) {
          console.log('ERROR parsing JSON', item);
          console.error('>>', error);
        }
        return {};
      });
    },
  },
};
