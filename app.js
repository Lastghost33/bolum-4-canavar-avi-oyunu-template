new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: [],
        attack_dam: 10,
        special_dam: 15,
        heal_poi: 25,
        mon_dam: 15,
        log_text: {
            ply_at: "OYUNCU VAHŞİCE SALDIRDI",
            ply_spc_at: "OYUNCU ŞEREFSİZ HAYSİTYETSİZ BİR ŞEKİLDE CANAVARA ÖZEL VAHŞİ SALDIRISI İLE SALDIRDI",
            ply_he_up: "OYUNCU SAKLANIP KENDİNİ İYİLEŞTİRDİ KORKAK",
            ply_giv_up: "OYUNCU CANAVARA OLAN AŞKINI FARKEDİP SAVAŞI BIRAKTI CANAVARLA İLİŞKİ YAŞARKEN ÖLDÜ",
            mon_dam:"CANAVAR KENDİNİ SAVUNDU",
            lose_conf: "Öldün Canavar tarafından katledildin Kaybettin Tekrar Denemek istermisin Kaybeden",
            win_conf: "KAZANDIN zavallı Canavarı vahşice öldürdün pislik umarım mutlusundur tekrar denemek istermisin"



        }

    },
    methods: {
        start_game() {
            this.game_is_on = true;

        },
        attack: function () {
            var point = Math.ceil(Math.random() * this.attack_dam);
            this.monster_heal -= point;
            this.add_to_log({
                turn: "O",
                text: this.log_text.ply_at + point 
            });
            this.monster_atack();
        },
        special_attack() {
            var point = Math.ceil(Math.random() * this.special_dam);
            this.add_to_log({
                turn: "O",
                text: this.log_text.ply_spc_at + point 
            });
            this.monster_heal -= point;
            this.monster_atack();
        },
        heal_up() {
            var point = Math.ceil(Math.random() * this.heal_poi);
            this.player_heal += point;
            this.add_to_log({
                turn: "O" ,
                text:  this.log_text.ply_he_up + point 
            });
            this.monster_atack();
        },
        give_up() {
            this.player_heal = 0;
            this.add_to_log({
                turn: "O",
                text:  this.log_text.ply_giv_up
            });
        },
        monster_atack() {
            var point = Math.ceil(Math.random() * this.mon_dam);
            this.player_heal -= point;
            this.add_to_log({
                turn: "M",
                text: this.log_text.mon_dam + point 
            });
        },
        add_to_log: function (log) {
            this.logs.push(log);
        }


    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm(this.log_text.lose_conf)) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs= [];
                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm(this.log_text.win_conf)) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs= [];
                }
            } else if (value >= 100) {
                this.monster_heal = 100;
            }
        },




    },
    computed: {
        ply_progress: function(){
            return {
                width : this.player_heal + "%" 
            }
        },
        mo_progress: function(){
            return {
                width : this.monster_heal + "%"

            }
        }


    }
})