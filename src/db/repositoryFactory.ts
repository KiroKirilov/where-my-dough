export class RepositoryFactory {
  public static createInstance<TRepo>(CreatorFunc: new () => TRepo) {
    return new CreatorFunc();
  }
}
