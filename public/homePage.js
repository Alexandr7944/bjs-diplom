const logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout(responseBody => {
        if(responseBody) {
            location.reload();
        }
    })
}

ApiConnector.current(({data, success}) => {
    if(success) {
        ProfileWidget.showProfile(data);
    }
})

const ratesBoard = new RatesBoard;
const board = () => {
    ApiConnector.getStocks(({data, success}) => {
        if(success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    })
    setInterval(board, 60000);
}
board();

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, data => {
        if(data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, 'Пополнение счета произведено успешно');
        }else{
            moneyManager.setMessage(data.success, data.error);
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, data => {
        if(data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, 'Конвертация валют произведена успешно');
        }else{
            moneyManager.setMessage(data.success, data.error);
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, data => {
        if(data.success) {
            ProfileWidget.showProfile(data.data);
            moneyManager.setMessage(data.success, 'Перевод средств произведен успешно');
        }else{
            moneyManager.setMessage(data.success, data.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites(data => {
    if(data.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, data => {
        if(data.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            favoritesWidget.setMessage(data.success, 'Пользователь добавлен в список избранных');
        }else{
            favoritesWidget.setMessage(data.success, data.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, data => {
        if(data.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            favoritesWidget.setMessage(data.success, 'Пользователь удален из списка избранных');
        }else{
            favoritesWidget.setMessage(data.success, data.error);
        }
    })
}