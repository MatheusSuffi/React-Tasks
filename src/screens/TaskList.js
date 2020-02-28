import React, {Component} from 'react'
import {Alert, View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'
import moment from 'moment'

import AsyncStorage from '@react-native-community/async-storage'
import 'moment/locale/pt-br'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'

const initialState = { 
        showDoneTasks:true, 
        showAddTask: false,
        visibleTasks : [],
        tasks: []
    }

import AddTask from './AddTask'
export default class TaskList extends Component{
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString) || initialState
        this.setState(state, this.filterTaks)

    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTaks)
    }

    filterTaks = () => {
        let visibleTasks = null;
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTaks)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Invalidos', 'Descrição não informada!')
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({tasks,showAddTask: false}, this.filterTaks)
    } 

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    getImage = () => {
        switch (this.props.daysAhead) {
            case 0:
                    return todayImage;
                break;
            
            case 1:
                    return tomorrowImage;
                break;
            
            case 7:
                    return weekImage;
                break;
            
            case 30:
                    return monthImage;
                break;
        
            default:
                return monthImage;
                break;
        }
    }

    getColor = () => {
        switch (this.props.daysAhead) {
            case 0:
                    return commonStyles.colors.today;
                break;
            
            case 1:
                    return commonStyles.colors.tomorrow;
                break;
            
            case 7:
                    return commonStyles.colors.week;
                break;
            
            case 30:
                    return commonStyles.colors.month;
                break;
        
            default:
                return commonStyles.colors.month;
                break;
        }
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({showAddTask:false})} onSave={this.addTask}/>
                <ImageBackground
                    style={styles.background}
                    source={this.getImage()}>
                        <View style={styles.iconBar}>

                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='bars' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item}  onToggleTask={this.toggleTask} onDelete={this.deleteTask}/>}  />
                </View>
                <TouchableOpacity style={[styles.addButton,{backgroundColor: this.getColor()}]} onPress={() => this.setState({showAddTask: true})} activeOpacity={0.7}>
                    <Icon name="plus" size={20} color={commonStyles.colors.secondary} /> 
                </TouchableOpacity>
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
        justifyContent:'space-between',
        marginTop: Platform.OS === 'ios' ? 30 : 10
    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems:'center'
    }
})  