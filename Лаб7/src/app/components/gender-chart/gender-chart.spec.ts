import { GenderChartComponent } from './gender-chart';
describe('GenderChartComponent', () => {
  let component: GenderChartComponent;
  const dummyUsers = [
    { id:'1', gender:'male' }, { id:'2', gender:'female' }, { id:'3', gender:'other' }
  ] as any;

  beforeEach(() => {
    component = new GenderChartComponent();
  });

  // 19. створення компонента
  it('компонент створено', () => {
    expect(component).toBeTruthy();
  });

  // 20. оновлення чарту з null
  it('оновлює графік навіть якщо null', () => {
    component.users = null as any;
    component.updateChart();
    expect(component.chartData.datasets[0].data).toEqual([0,0,0]);
  });

  // 21. рахує правильну кількість
  it('рахує користувачів за статтю', () => {
    component.users = dummyUsers;
    component.updateChart();
    expect(component.chartData.datasets[0].data).toEqual([1,1,1]);
  });

  // 22. ngOnChanges викликає updateChart
  it('ngOnChanges викликає updateChart', () => {
    spyOn(component,'updateChart');
    component.ngOnChanges({});
    expect(component.updateChart).toHaveBeenCalled();
  });
  // 23.
  it('оновлює графік навіть якщо users undefined', () => {
  component.users = undefined as any;
  component.updateChart();
  expect(component.chartData.datasets[0].data).toEqual([0,0,0]);
});
  // 24.
it('рахує користувачів за статтю правильно', () => {
  component.users = [
    { id:'1', gender:'male' } as any,
    { id:'2', gender:'female' } as any,
    { id:'3', gender:'other' } as any,
    { id:'4', gender:'female' } as any
  ];
  component.updateChart();
  expect(component.chartData.datasets[0].data).toEqual([1,2,1]);
});

});