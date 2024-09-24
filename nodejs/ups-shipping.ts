import axios from 'axios';

/**
 * info: this route is used to get the cart data from the store api by appending the cart token to the body
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  // Extract the shipping address from the request body
  const url = 'https://onlinetools.ups.com/ship/v1/rating/Rate';

  const Weight = (0.219 * 2.205).toString(); // convert to lbs
  const ShipTo = {
    Address: {
      PostalCode: '48628',
      CountryCode: 'US',
    },
  };

  const ShipFrom = {
    Name: 'College press',
    Address: {
      PostalCode: '48917',
      CountryCode: 'US',
    },
  };

  const Shipper = {
    Name: 'ONEaccord store',
    Address: {
      PostalCode: '48917',
      CountryCode: 'US',
    },
  };

  const data = {
    RateRequest: {
      Request: {
        RequestOption: 'Rate',
        TransactionReference: {
          CustomerContext: '',
        },
      },
      Shipment: {
        Shipper,
        ShipTo,
        ShipFrom,
        Service: {
          Code: '03',
          Description: 'Ground',
        },
        Package: {
          PackagingType: {
            Code: '02',
            Description: 'Package',
          },
          Dimensions: {
            UnitOfMeasurement: {
              Code: 'IN',
            },
            Length: '5',
            Width: '5',
            Height: '5',
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: 'LBS',
              Description: 'Pounds',
            },
            Weight,
          },
        },
      },
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        AccessLicenseNumber: '*******************',
        Username: '*******************',
        Password: '*******************',
      },
    });

    return Response.json({ success: true, data: response.data });
  } catch (error: any) {
    return Response.json({ success: false, payload: error?.response?.data });
  }
}
