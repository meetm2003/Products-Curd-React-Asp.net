using System.ComponentModel.DataAnnotations;

namespace Ecommerce_assi_2.Server.Models
{
    public class Products
    {
        [Key]
        public int Pid { get; set; }
        public string Pname { get; set; }
        public string Price { get; set; }
        public string Qty { get; set; }
        public string Pimg { get; set; }

    }
}
