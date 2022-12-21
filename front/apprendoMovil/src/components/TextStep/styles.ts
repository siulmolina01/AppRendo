import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 1.25,
    color: '#000',
  },
  icon: {
    marginVertical: 35,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  step: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  position: {
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 24,
    color: '#000',
    alignSelf: 'center',
  },
  stepTitle: {
    marginLeft: 35,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 24,
    alignSelf: 'center',
    color: '#000',
  },
  description: {
    alignSelf: 'flex-start',
    textAlign: 'justify',
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 24,
    color: '#000',
    marginTop: 35,
  },
});
