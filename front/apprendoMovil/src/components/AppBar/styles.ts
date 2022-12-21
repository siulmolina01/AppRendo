import {StyleSheet} from 'react-native';
import {bg, white} from '../../common/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 80,
  },
  iconContainer: {
    backgroundColor: bg,
    padding: 10,
    borderRadius: 8,
  },
});
