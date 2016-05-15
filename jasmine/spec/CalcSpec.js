describe("Calc tests suit", function () {
    var calc;
    beforeEach(function(){
         calc = new Calc();
    });

    afterEach(function(){

    });

    describe('add tests', function () {
        it('should be able to add two numbers', function () {
            var result = calc.add(2, 5);

            expect(result).toEqual(7);
        });

        it('should throw error if one or more arguments are missing', function () {
            expect(function () {
                calc.add(1);
            }).toThrow();
        })

        it('tests spy', function(){
            //Sprawia ze metoda add bedzie pusta
            //spyOn(calc, "add");
            //
            //var result = calc.add(2,3);
            //
            //expect(result).toBeUndefined();
            //
            //expect(calc.add).toHaveBeenCalled();

            //spyOn(calc, 'add').and.throwError("tresc");

            spyOn(calc, "add").and.returnValue(5);

            result = calc.add(2,3);

            expect(result).toEqual(5);

            expect(calc.add).toHaveBeenCalledTimes(1);

            expect(calc.add).toHaveBeenCalledWith(2,3);
        })
    });
});