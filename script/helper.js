export const checkWinner = (tableCases) => {

    for (let i=1;i <= 3;i++){

        // pour ligne 
        // 1-1 1-2 1-3
        // 2-1 2-2 2-3
        // 3-1 3-2 3-3
        if (tableCases[i-1][0] == 'O' && tableCases[i-1][1] == 'O' && tableCases[i-1][2] == 'O'){
            return 'O';
        }
        if (tableCases[i-1][0] == 'X' && tableCases[i-1][1] == 'X' && tableCases[i-1][2] == 'X'){
            return 'X';
        }

        // pour colonne
        // 1-1 2-1 3-1
        // 1-2 2-2 3-2
        // 1-3 2-3 3-3
        if (tableCases[0][i-1] == 'O' && tableCases[1][i-1] == 'O' && tableCases[2][i-1] == 'O'){
            return 'O';
        }
        if (tableCases[0][i-1] == 'X' && tableCases[1][i-1] == 'X' && tableCases[2][i-1] == 'X'){
            return 'X';
        }
    }
    // vertical
    // 1-1 2-2 3-3
    // 1-3 2-2 3-1
    if (tableCases[0][0] == 'O' && tableCases[1][1] == 'O' && tableCases[2][2] == 'O'){
        return 'O';
    }
    if (tableCases[0][0] == 'X' && tableCases[1][1] == 'X' && tableCases[2][2] == 'X'){
        return 'X';
    }
    if (tableCases[0][2] == 'O' && tableCases[1][1] == 'O' && tableCases[2][0] == 'O'){
        return 'O';
    }
    if (tableCases[0][2] == 'X' && tableCases[1][1] == 'X' && tableCases[2][0] == 'X'){
        return 'X';
    }
    return '#'

}