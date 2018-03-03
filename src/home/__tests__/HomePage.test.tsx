import 'react-native';
import * as React from 'react';

// Note: test renderer must be required after react-native.
import { create } from 'react-test-renderer';

import { Home } from 'src/home/HomePage';

// Using `create` from `react-test-renderer`, it is possible to convert
// the rendered element into a JSON object as shown below. Using that
// object is a simple way to test a rendered component.

// Note: this specific test is contrived to illustrate the types of properties
// you will likely encounter in the JSON. In reality, if you wanted to test
// that every property was correct, you would use snapshots.
it('renders correctly', () => {
  const tree = create(<Home />);
  const expectedJSON = {
    type: 'View',
    props: {
      style: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 100,
      },
    },
    children: [
      {
        type: 'Text',
        props: {
          style: {
            fontSize: 25,
            textAlign: 'center',
          },
          accessible: true,
          allowFontScaling: true,
          ellipsizeMode: 'tail',
        },
        children: ['Edit or remove this file.'],
      },
    ],
  };
  expect(tree.toJSON()).toEqual(expectedJSON);
});

// Since `Home` is just a class, it can be tested like any other
// class without the need to render.
it('should not have any props', () => {
  const home = new Home({});
  expect(Object.keys(home.props).length).toEqual(0);
});
