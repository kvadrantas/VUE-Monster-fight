function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessagges: []
        }
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <=0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <=0 && this.playerHealth <=0) {
                this.winner = 'draw';
            } else if (value <=0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const damageValue = getRandomValue(5, 12);
            if(this.monsterHealth - damageValue <= 0) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= damageValue;
            }
            this.addLogMessage('player', 'attack', damageValue)
            this.attackPlayer();
        },
        attackPlayer() {
            const damageValue = getRandomValue(8, 15);
            if(this.playerHealth - damageValue <= 0) {
                this.playerHealth = 0
            } else {
                this.playerHealth -= damageValue;
            }
            this.addLogMessage('monster', 'attack', damageValue)
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heals', healValue)
            this.attackPlayer();
        },
        specialAttackMonster() {
            this.currentRound++;
            const damageValue = getRandomValue(10, 25);
            this.monsterHealth -= damageValue;
            this.addLogMessage('player', 'special-attack', damageValue)
            this.attackPlayer();
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessagges =[];
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.logMessagges.push({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
});

app.mount('#game');