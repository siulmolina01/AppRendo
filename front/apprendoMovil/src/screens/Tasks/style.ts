import {StyleSheet} from 'react-native';
import {bg, red, white} from '../../common/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    justifyContent: 'center',
  },
  mainContent: {
    marginHorizontal: 25,
    marginVertical: 45,
    backgroundColor: white,
    borderRadius: 12,
    height: '90%',
    padding: 20,
  },
  taskEntryContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
  },
  taskEntry: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    textOverflow: 'ellipsis',
  },
  errorText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    color: red,
    textAlign: 'center',
    backgroundColor: white,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 30,
  },
});
