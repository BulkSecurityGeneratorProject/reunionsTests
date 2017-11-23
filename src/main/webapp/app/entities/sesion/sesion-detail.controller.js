(function() {
    'use strict';

    angular
        .module('reunionsApp')
        .controller('SesionDetailController', SesionDetailController);

    SesionDetailController.$inject = ['$location', '$anchorScroll', '$scope', '$rootScope', '$stateParams', '$previousState', 'previousState', 'DataUtils', 'entity', 'Principal', 'Sesion', 'Organo', 'Participante', 'Documento'];

    function SesionDetailController($location, $anchorScroll, $scope, $rootScope, $stateParams, $previousState, previousState, DataUtils, entity, Principal, Sesion, Organo, Participante, Documento) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.sesion = entity;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.notificar = notificar;
        vm.exportar = exportar;
        vm.back = back;
        vm.marcarAsistencia = marcarAsistencia;
        vm.admin = false;
        vm.previousState = $previousState.get();
        vm.marcando = false;
        vm.predicate = 'user.lastName|noAccents';
        vm.reverse = true;

        vm.goUp = function(id) {
                          var old = $location.hash();
                          $location.hash(id);
                          $anchorScroll();
                          //reset to old to keep any additional routing logic from kicking in
                          $location.hash(old);
                          };

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        Organo.miembros({ id : vm.sesion.organo.id }).$promise.then( function(data) {
             if (vm.isAuthenticated) {
                if (vm.account.authorities.includes("ROLE_ADMIN")) {
                    vm.admin = true;
                } else {
                    data.forEach(function(element) {
                         if (element.user.login == vm.account.login && element.cargo.id < 3) vm.admin = true;
                    });
                }
             }
        });

        vm.documentos = Sesion.documentos({ id: $stateParams.id })
        vm.participantes = Sesion.participantes({ id: $stateParams.id });

        vm.qFn = function(actual, expected) {
            if (angular.isObject(actual)) return false;
            function removeAccents(value) {
              return value.toString().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n');
            }
            actual = removeAccents(angular.lowercase('' + actual));
            expected = removeAccents(angular.lowercase('' + expected));

            return actual.indexOf(expected) !== -1;
        }

        function marcarAsistencia () {
            if (vm.marcando) {
                vm.marcando = false;
                Sesion.marcarAsistencia(vm.participantes);
            } else {
                vm.marcando = true;
            }
        }

        function byname (a, b) {
            return a.user.lastName.localeCompare(b.user.lastName);

        }

        function exportar () {
            var i;
            var cabecera = "Relación de asistentes a la sesión número " + vm.sesion.numero + " del órgano " + vm.sesion.organo.nombre;
            var asistentes = "\n\nAsiste:";
            var disculpas = "\n\nDisculpa:";
            var faltas = "\n\nFalta:";
            vm.copiaparticipantes = vm.participantes.slice(0);
            for (i in vm.copiaparticipantes.sort(byname)) {
                var p = vm.participantes[i];
                if (p.asistencia == "asiste") {
                    asistentes += "\n\t" + p.user.lastName + ", " + p.user.firstName;
                } else if (p.asistencia == "disculpa") {
                    disculpas += "\n\t" + p.user.lastName + ", " + p.user.firstName;
                } else if (p.asistencia == "falta") {
                    faltas += "\n\t" + p.user.lastName + ", " + p.user.firstName;
                }
            }
            var a = document.body.appendChild(
                    document.createElement("a")
                );
            a.download = "participacion.txt";
            a.href = "data:text/plain;base64," + btoa(cabecera + asistentes + disculpas + faltas);
            a.click()
        }

        function notificar () {
            Sesion.notificar(vm.sesion);
        }

        function back () {
            $previousState.go();
        }

        var unsubscribe = $rootScope.$on('reunionsApp:sesionUpdate', function(event, result) {
            vm.sesion = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
