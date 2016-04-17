describe('dtl.module', function () {

    describe('dtlQuery', function() {
        var dtlQuery,
            dtlResource;

        beforeEach(module('dtl'));
        beforeEach(function() {
            module({
                'dtlResource': {}
            });
        });
        beforeEach(inject(function (_dtlQuery_, _dtlResource_) {
            dtlQuery = _dtlQuery_;
            dtlResource = _dtlResource_;
        }));

        describe('prepare', function() {
            var where,
                options,
                include;

            beforeEach(function() {
                where = null;
                options = null;
                include = null;
            });

            it('call with all arguments and options', function() {
                where = { id: 10 };
                options = { limit: 5, page: 2, orderBy:'date', sort: 'DESC'};
                include = 'model1';

                dtlQuery.prepare(where, options, include)
                .filter.should.deep.equal({
                    where: where,
                    include: include,
                    limit: options.limit,
                    skip: 10,
                    order: 'date DESC'
                });
            });

            it('call with defaults and module configuration set', function() {
                dtlResource.limit = 5;
                dtlQuery.prepare()
                .filter.should.deep.equal({
                    where: {},
                    include: {},
                    limit: 5,
                    skip: 0,
                    order: 'id DESC'
                });
            });

            it('call with defaults and no module configuration set', function() {
                dtlQuery.prepare()
                .filter.should.deep.equal({
                    where: {},
                    include: {},
                    limit: 10,
                    skip: 0,
                    order: 'id DESC'
                });
            });
        });

    });

});
