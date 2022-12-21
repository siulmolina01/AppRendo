import {StyleSheet} from 'react-native';
import {bg, grey2, red} from '../../common/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
  },
  topContainer: {
    marginTop: 30,
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 1.25,
    textAlign: 'center',
    color: red,
    marginLeft: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  back: {
    borderColor: grey2,
    borderWidth: 3,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  hidden: {
    width: 50,
  },
});
