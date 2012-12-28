expect = chai.expect;

describe('Test web', function(){
  it('should print `Hey guy` when clicking on link toto', function(done){
    $('a[href="/toto"]').click();
    expect($('#main h2')).to.have.text('Hey guy');
    done();
  });
});
