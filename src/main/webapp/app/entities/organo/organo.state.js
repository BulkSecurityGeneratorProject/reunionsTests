(function() {
    'use strict';

    angular
        .module('reunionsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('organo', {
            parent: 'app',
            url: '/organo',
            data: {
                authorities: [],
                pageTitle: 'reunionsApp.organo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/organo/organos.html',
                    controller: 'OrganoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('organo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('organo-detail', {
            parent: 'organo',
            url: '/{id}',
            data: {
                authorities: [],
                pageTitle: 'reunionsApp.organo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/organo/organo-detail.html',
                    controller: 'OrganoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('organo');
                    $translatePartialLoader.addPart('miembro');
                    $translatePartialLoader.addPart('sesion');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Organo', function($stateParams, Organo) {
                    return Organo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'organo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('organo-detail.edit', {
            parent: 'organo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organo/organo-dialog.html',
                    controller: 'OrganoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Organo', function(Organo) {
                            return Organo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('organo.new', {
            parent: 'organo',
            url: '',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organo/organo-dialog.html',
                    controller: 'OrganoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombre: null,
                                descripcion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('organo', null, { reload: 'organo' });
                }, function() {
                    $state.go('organo');
                });
            }]
        })
        .state('organo.edit', {
            parent: 'organo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organo/organo-dialog.html',
                    controller: 'OrganoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Organo', function(Organo) {
                            return Organo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('organo', null, { reload: 'organo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('organo.delete', {
            parent: 'organo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organo/organo-delete-dialog.html',
                    controller: 'OrganoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Organo', function(Organo) {
                            return Organo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('organo', null, { reload: 'organo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
