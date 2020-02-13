import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class TaskList extends Component{
    state = {
        showDoneTasks:true, 

        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            desc: 'Ler Livro de React Native',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background}
                    source={todayImage}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item}  toggleTask={this.toggleTask}/>} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 // Estou permitindo que o container cresca
    },
    background: {
        flex: 3 //Vai ocupar 30% da tela
    },
    taskList: {
        flex: 7 //Vai ocupar 70% da tela
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft:20,
        marginBottom: 20
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft:20,
        marginBottom:20
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent:'flex-end',
        marginTop: Platform.OS === 'ios' ? 30 : 10
    }
})  