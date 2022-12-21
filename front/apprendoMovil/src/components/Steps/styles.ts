import {StyleSheet} from 'react-native';
import {green, grey, grey3, white} from '../../common/colors';

export const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: white,
    borderRadius: 12,
    marginHorizontal: 25,
    marginVertical: 40,
    flex: 1,
  },
  handCounter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: grey3,
    padding: 20,
    borderRadius: 8,
  },
  children: {
    alignItems: 'center',
  },
  check: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: grey,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  checkDone: {
    width: 60,
    height: 60,
    backgroundColor: green,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: green,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
