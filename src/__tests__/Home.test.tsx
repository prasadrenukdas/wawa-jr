import 'react-native';
import * as React from 'react';
import { HomeComponent } from 'src/Home';

// Note: test renderer must be required after react-native.
import { create } from 'react-test-renderer';

it('renders correctly', () => {
  const tree = create(<HomeComponent />);
  tree;
});
