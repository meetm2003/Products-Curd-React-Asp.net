using Microsoft.EntityFrameworkCore;
namespace Ecommerce_assi_2.Server.Models
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) 
        { 
        }
    public DbSet<Products> products { get; set; }
    }
}
