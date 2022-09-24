import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput, View } from 'react-native'

export default class SearchInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
    
  }

  handleChangeText = text => {
    this.setState({ text }); 
  }

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if(!text){
      return;
    }

    onSubmit(text);
    this.setState({ text: '' })
  }


  render(){
    // there are two destructures: { placeholder } and { text }
    /*
      Instead of using this.props.placeholder and this.state.text directy, we destructured
      both objects at the beginning of our render method into individual variables (text and
      placeholder)
    */
    const { placeholder } = this.props;
    const { text } = this.state;
    return(
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text} // responsible for the content showed in the input field
          placeholder={placeholder}
          placeholderTextColor='white'
          underlineColorAndroid='transparent' //remove the dark underline that shows by default on Android
          style={styles.textInput}
          clearButtonMode='always' //show a button on right side to allow clear the text(only iOS)
          onChangeText={this.handleChangeText} // update state every time the input field is changed
          onSubmitEditing={this.handleSubmitEditing} // fires when the user submits the field and not just changes it
          />
      </View>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1, 
    color: 'white'
  },
})