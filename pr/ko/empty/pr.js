/**
 * Launches payment request that provides different shipping options based on
 * the shipping address that the user selects.
 */
function onBuyClicked() { // eslint-disable-line no-unused-vars
  var supportedInstruments = [{
      supportedMethods: 'https://google.com/pay',
      data: {
        allowedPaymentMethods: ['TOKENIZED_CARD', 'CARD'],
        apiVersion: 1,
        cardRequirements: {
          'allowedCardNetworks': ['VISA', 'MASTERCARD', 'AMEX'],
        },
        merchantName: 'Rouslan Solomakhin',
        merchantId: '00184145120947117657',
        paymentMethodTokenizationParameters: {
          tokenizationType: 'GATEWAY_TOKEN',
          parameters: {
            'gateway': 'stripe',
            'stripe:publishableKey': 'pk_live_lNk21zqKM2BENZENh3rzCUgo',
            'stripe:version': '2016-07-06',
          },
        },
      },
    },
    {
      supportedMethods: 'basic-card',
    },
  ];

  var details = {
    total: {
      label: 'Donation',
      amount: {
        currency: 'USD',
        value: '55.00'
      }
    },
    displayItems: [{
        label: 'Original donation amount',
        amount: {
          currency: 'USD',
          value: '65.00'
        }
      },
      {
        label: 'Pending shipping price',
        amount: {
          currency: 'USD',
          value: '0.00'
        },
        pending: true
      },
      {
        label: 'Friends and family discount',
        amount: {
          currency: 'USD',
          value: '-10.00'
        }
      }
    ]
  };

  var options = {
    requestShipping: true
  };

  if (!window.PaymentRequest) {
    error('PaymentRequest API is not supported.');
    return;
  }

  try {
    var request = new PaymentRequest(supportedInstruments, details, options);

    request.addEventListener('shippingaddresschange', function(e) {
      e.updateWith({});
    });

    request.show()
      .then(function(instrumentResponse) {
          instrumentResponse.complete('success')
            .then(function() {
              done('This is a demo website. No payment will be processed.', instrumentResponse);
            })
            .catch(function(err) {
              error(err);
            });
      })
      .catch(function(err) {
        error(err);
      });
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
  }
}
