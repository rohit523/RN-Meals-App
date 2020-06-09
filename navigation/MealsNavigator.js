import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { craeteDrawerNavigator, createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
	Categories: {
		screen: CategoriesScreen
	},
	CategoryMeals: {
		screen: CategoryMealsScreen
	},
	MealDetail: MealDetailScreen
}, {
	// initialRouteName: 'MealDetail',
	defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
	Favorites: FavoritesScreen,
	MealDetail: MealDetailScreen
}, {
	// initialRouteName: 'MealDetail',
	defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator, 
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
				)
			},
			tabBarColor: Colors.primaryColor
		}
	},
	Favorites: {
		screen: FavNavigator, 
		navigationOptions: {
			tabBarLabel: 'Favorites!',
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
				)
			},
			tabBarColor: Colors.accentColor
		}
	}
}


const MealsFavTabNavigator = 
	Platform.OS === 'android' ? 
		createMaterialBottomTabNavigator(tabScreenConfig, {
			activeTintColor: Colors.accentColor,
			shifting: true
		}) 
		: createBottomTabNavigator(tabScreenConfig, {
			tabBarOptions: {
				activeTintColor: Colors.accentColor
			}
		});

const FiltersNavigator = createStackNavigator({
	Filters: FilterScreen
});		

const MainNavigator = createDrawerNavigator({
	MealsFav: MealsFavTabNavigator,
	Filters: FiltersNavigator
});

export default createAppContainer(MainNavigator);